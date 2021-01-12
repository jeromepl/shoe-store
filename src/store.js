import { types } from 'mobx-state-tree';
import { values } from 'mobx';


const DATA_URL = 'ws://localhost:8080/';
const STORE_LIST = ['ALDO Centre Eaton', 'ALDO Destiny USA Mall', 'ALDO Pheasant Lane Mall', 'ALDO Holyoke Mall', 'ALDO Maine Mall', 'ALDO Crossgates Mall', 'ALDO Burlington Mall', 'ALDO Solomon Pond Mall', 'ALDO Auburn Mall', 'ALDO Waterloo Premium Outlets'];
const SHOE_LIST = ['ADERI', 'MIRIRA', 'CAELAN', 'BUTAUD', 'SCHOOLER', 'SODANO', 'MCTYRE', 'CADAUDIA', 'RASIEN', 'WUMA', 'GRELIDIEN', 'CADEVEN', 'SEVIDE', 'ELOILLAN', 'BEODA', 'VENDOGNUS', 'ABOEN', 'ALALIWEN', 'GREG', 'BOZZA'];
const RECENT_SALES_CACHE_SIZE = 30;
const LOW_STOCK_THRESHOLD = 5;

const Inventory = types
    .model({
        inventory: types.map(types.number)
    })
    .views(self => ({
        get totalInventory() {
            // Sum all shoe counts
            return values(self.inventory).reduce((acc, count) => acc + (count > 0 ? count : 0));
        },
        get lowCountPercentage() {
            return values(self.inventory).filter(count => count >= 0 && count < LOW_STOCK_THRESHOLD).length / SHOE_LIST.length;
        }
    }))
    .actions(self => ({
        setInventoryCount(shoe, count) {
            self.inventory.set(shoe, count);
        }
    }));

const Sale = types.model({
    store: types.string,
    model: types.string,
    inventory: types.number
});

const Stores = types
    .model({
        stores: types.map(Inventory),
        recentSales: types.array(Sale)
    })
    .views(self => ({
        get totalInventory() {
            // Sum the total inventories from all stores
            let totalCount = 0;
            values(self.stores).forEach((store) => totalCount += store.totalInventory);
            return totalCount;
        },
        get lowCountPercentage() {
            let totalCount = 0;
            values(self.stores).forEach((store) => totalCount += store.lowCountPercentage);
            return totalCount / STORE_LIST.length;
        }
    }))
    .actions(self => ({
        addSale(store, model, inventory) {
            self.recentSales.push(Sale.create({ store, model, inventory }));
            if (self.recentSales.length > RECENT_SALES_CACHE_SIZE) {
                self.recentSales.shift();
            }
        }
    }));

const defaultValue = {};
STORE_LIST.forEach(store => {
    const shoesMap = {};
    SHOE_LIST.forEach(shoe => shoesMap[shoe] = -1);
    defaultValue[store] = { inventory: shoesMap };
});

const dataStore = Stores.create({ stores: defaultValue });

// Connect to data stream
const ws = new WebSocket(DATA_URL);

ws.onmessage = function (event) {
    const { store, model, inventory } = JSON.parse(event.data);
    dataStore.stores.get(store).setInventoryCount(model, inventory);
    dataStore.addSale(store, model, inventory);
};


export default dataStore;
export {
    STORE_LIST,
    SHOE_LIST
}
