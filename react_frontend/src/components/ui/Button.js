import React from 'react';

/**
 * @typedef {{
 *   children: React.ReactNode,
 *   onClick: (function(): void)|undefined,
 *   type: ('button'|'submit')|undefined,
 *   variant: ('primary'|'secondary'|'ghost')|undefined,
 *   disabled: boolean|undefined,
 *   className: string|undefined,
 *   ariaLabel: string|undefined
 * }} ButtonProps
 */

/**
 * PUBLIC_INTERFACE
 * Retro-themed button component.
 * @param {!ButtonProps} props
 * @return {React.ReactElement}
 */
function Button(props) {
    const {
        children,
        onClick,
        type = 'button',
        variant = 'primary',
        disabled = false,
        className = '',
        ariaLabel,
    } = props;

    const variantClass =
        variant === 'secondary'
            ? 'btn btn-secondary'
            : variant === 'ghost'
                ? 'btn btn-ghost'
                : 'btn btn-primary';

    return (
        <button
            type={type}
            className={`${variantClass} ${className}`.trim()}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}

export default Button;
