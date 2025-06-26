import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { cn } from 'fumadocs-ui/utils/cn';
export const badgeVariants = cva('font-mono font-medium', {
    variants: {
        color: {
            green: 'text-green-600 dark:text-green-400',
            yellow: 'text-yellow-600 dark:text-yellow-400',
            red: 'text-red-600 dark:text-red-400',
            blue: 'text-blue-600 dark:text-blue-400',
            orange: 'text-orange-600 dark:text-orange-400',
        },
    },
});
function getMethodColor(method) {
    switch (method.toUpperCase()) {
        case 'PUT':
            return 'yellow';
        case 'PATCH':
            return 'orange';
        case 'POST':
            return 'blue';
        case 'DELETE':
            return 'red';
        default:
            return 'green';
    }
}
export function Badge({ className, color, ...props }) {
    return (_jsx("span", { className: cn(badgeVariants({
            color,
            className,
        })), ...props, children: props.children }));
}
export function MethodLabel({ children, ...props }) {
    return (_jsx(Badge, { ...props, color: getMethodColor(children), children: children.toUpperCase() }));
}
