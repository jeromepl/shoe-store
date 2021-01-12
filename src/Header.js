import React from 'react';
import styled from 'styled-components';

import useHover from './useHover';
import logo from './offline_shopping.svg';


const Title = styled.h1`
    display: inline-block;
    margin-left: 30px;
    font-size: 36px;
    color: black;
    cursor: pointer;

    transition: color ease 1s;

    &.open {
        color: white;
    }
`;

const LogoContainer = styled.div`
    position: absolute;
    left: -159px;
    top: -99px;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    overflow: hidden;
    z-index: -10;

    transition: width ease 1s, height ease 1s;

    &.open {
        width: 700px;
        height: 700px;
    }
`;

const Logo = styled.img`
    width: 700px;
    filter: brightness(0.9);
`;

const Header = () => {
    const [hoverRef, isHovered] = useHover();

    return <header className="Header">
        <Title ref={hoverRef} className={isHovered ? 'open' : ''}>ALDO</Title>
        <LogoContainer className={isHovered ? 'open' : ''}>
            <Logo src={logo} className={`App-logo ${isHovered ? 'open' : ''}`} alt="logo" />
        </LogoContainer>
    </header>;
};

export default Header;
