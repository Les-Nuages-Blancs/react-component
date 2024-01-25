import React from 'react';

const CustomLink = ({
    href='',
    children,
    style,
    openNewWindow, 
    ...content
}) => {
    return (
        <a
            href={href}
            target={openNewWindow ? "_blank" : ""}
            rel="noreferrer"
            {...content}
            style={{
              cursor: 'pointer',
              ...style
            }}
        >
            {children}
        </a>
    );
};

export default CustomLink;
