'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState, } from 'react';
import { ChevronDown, Plus, Trash2 } from '../icons.js';
import { Controller, useController, useFieldArray, useFormContext, } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../ui/components/select.js';
import { Input, labelVariants } from '../ui/components/input.js';
import { getDefaultValue } from './get-default-values.js';
import { cn } from 'fumadocs-ui/utils/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { combineSchema } from '../utils/combine-schema.js';
import { schemaToString } from '../utils/schema-to-string.js';
import { anyFields, useFieldInfo, useResolvedSchema, } from '../playground/schema.js';
function FieldLabel(props) {
    return (_jsx("label", { ...props, className: cn('w-full inline-flex items-center gap-0.5', props.className), children: props.children }));
}
function FieldLabelName({ required = false, ...props }) {
    return (_jsxs("span", { ...props, className: cn(labelVariants(), 'font-mono me-auto', props.className), children: [props.children, required && _jsx("span", { className: "text-red-400/80 mx-1", children: "*" })] }));
}
function FieldLabelType(props) {
    return (_jsx("code", { ...props, className: cn('text-xs text-fd-muted-foreground', props.className), children: props.children }));
}
export function ObjectInput({ field: _field, fieldName, ...props }) {
    const resolved = useResolvedSchema(_field);
    const field = useMemo(() => combineSchema([resolved]), [resolved]);
    if (typeof field === 'boolean')
        return;
    return (_jsxs("div", { ...props, className: cn('grid grid-cols-1 gap-4 @md:grid-cols-2', props.className), children: [Object.entries(field.properties ?? {}).map(([key, child]) => (_jsx(FieldSet, { name: key, field: child, fieldName: `${fieldName}.${key}`, isRequired: field.required?.includes(key) }, key))), (field.additionalProperties || field.patternProperties) && (_jsx(DynamicProperties, { fieldName: fieldName, filterKey: (v) => !field.properties || !Object.keys(field.properties).includes(v), getType: (key) => {
                    for (const pattern in field.patternProperties) {
                        if (key.match(RegExp(pattern))) {
                            return field.patternProperties[pattern];
                        }
                    }
                    if (field.additionalProperties)
                        return field.additionalProperties;
                    return anyFields;
                } }))] }));
}
export function JsonInput({ fieldName }) {
    const controller = useController({
        name: fieldName,
    });
    const [error, setError] = useState(null);
    const [value, setValue] = useState(() => JSON.stringify(controller.field.value, null, 2));
    return (_jsxs("div", { className: "flex flex-col bg-fd-secondary text-fd-secondary-foreground overflow-hidden border rounded-lg", children: [_jsx("textarea", { ...controller.field, value: value, className: "p-2 h-[240px] text-sm font-mono resize-none focus-visible:outline-none", onChange: (v) => {
                    setValue(v.target.value);
                    try {
                        controller.field.onChange(JSON.parse(v.target.value));
                        setError(null);
                    }
                    catch (e) {
                        if (e instanceof Error)
                            setError(e.message);
                    }
                } }), _jsx("p", { className: "p-2 text-xs font-mono border-t text-red-400 empty:hidden", children: error })] }));
}
function DynamicProperties({ fieldName, filterKey = () => true, getType = () => anyFields, }) {
    const { control, setValue, getValues } = useFormContext();
    const [nextName, setNextName] = useState('');
    const [properties, setProperties] = useState(() => {
        const value = getValues(fieldName);
        if (value)
            return Object.keys(value).filter(filterKey);
        return [];
    });
    const onAppend = () => {
        const name = nextName.trim();
        if (name.length === 0)
            return;
        setProperties((p) => {
            if (p.includes(name) || !filterKey(name))
                return p;
            const type = getType(name);
            setValue(`${fieldName}.${name}`, getDefaultValue(type));
            setNextName('');
            return [...p, name];
        });
    };
    return (_jsxs(_Fragment, { children: [properties.map((item) => {
                const type = getType(item);
                return (_jsx(FieldSet, { name: item, field: type, fieldName: `${fieldName}.${item}`, toolbar: _jsx("button", { type: "button", "aria-label": "Remove Item", className: cn(buttonVariants({
                            color: 'outline',
                            size: 'icon-xs',
                        })), onClick: () => {
                            setProperties((p) => p.filter((prop) => prop !== item));
                            control.unregister(`${fieldName}.${item}`);
                        }, children: _jsx(Trash2, {}) }) }, item));
            }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: nextName, placeholder: "Enter Property Name", onChange: (e) => setNextName(e.target.value), onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                onAppend();
                                e.preventDefault();
                            }
                        } }), _jsx("button", { type: "button", className: cn(buttonVariants({ color: 'secondary', size: 'sm' }), 'px-4'), onClick: onAppend, children: "New" })] })] }));
}
export function FieldInput({ field, fieldName, isRequired, ...props }) {
    const { control, register } = useFormContext();
    console.log('field -->', fieldName, field);
    if (field.type === 'string' && field.format === 'binary') {
        return (_jsx(Controller, { control: control, name: fieldName, render: ({ field: { value, onChange, ...restField } }) => (_jsxs("div", { ...props, children: [_jsx("label", { htmlFor: fieldName, className: cn(buttonVariants({
                            color: 'secondary',
                            size: 'sm',
                            className: 'w-full',
                        })), children: value ? value.name : 'Upload' }), _jsx("input", { id: fieldName, type: "file", multiple: false, onChange: (e) => {
                            if (!e.target.files)
                                return;
                            onChange(e.target.files.item(0));
                        }, hidden: true, ...restField })] })) }));
    }
    if (field.type === 'boolean') {
        return (_jsx(Controller, { control: control, name: fieldName, render: ({ field: { value, onChange, ...restField } }) => (_jsxs(Select, { value: String(value), onValueChange: (value) => onChange(value === 'null' ? null : value === 'true'), disabled: restField.disabled, children: [_jsx(SelectTrigger, { id: fieldName, className: props.className, ...restField, children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "true", children: "True" }), _jsx(SelectItem, { value: "false", children: "False" }), !isRequired && _jsx(SelectItem, { value: "null", children: "Null" })] })] })) }));
    }
    if (field.enum) {
        return (_jsx(Controller, { control: control, name: fieldName, render: ({ field: { value, onChange, ...restField } }) => (_jsxs(Select, { value: String(value), onValueChange: (value) => {
                    onChange(value === 'null' ? null : value);
                }, disabled: restField.disabled, children: [_jsx(SelectTrigger, { id: fieldName, className: props.className, ...restField, children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: field.enum?.map((item) => (_jsx(SelectItem, { value: item, children: item }, item))) })] })) }));
    }
    if (field.type === 'null')
        return;
    return (_jsx(Input, { id: fieldName, placeholder: "Enter value", type: field.type === 'string' ? 'text' : 'number', ...register(fieldName, {
            valueAsNumber: field.type === 'number' || field.type === 'integer',
        }), ...props }));
}
export function FieldSet({ field: _field, fieldName, toolbar, name, isRequired, depth = 0, slotType, collapsible = true, ...props }) {
    const field = useResolvedSchema(_field);
    const [show, setShow] = useState(!collapsible);
    const { info, updateInfo } = useFieldInfo(fieldName, field, depth);
    console.log('fieldSet =>', fieldName, collapsible, show, field.oneOf);
    if (_field === false)
        return null;
    if (field.oneOf) {
        const showSelect = field.oneOf.length > 1;
        return (_jsx(FieldSet, { ...props, name: name, fieldName: fieldName, isRequired: isRequired, field: field.oneOf[info.oneOf], depth: depth + 1, slotType: showSelect ? false : slotType, collapsible: collapsible, toolbar: _jsxs(_Fragment, { children: [showSelect && (_jsx("select", { className: "text-xs font-mono", value: info.oneOf, onChange: (e) => {
                            updateInfo({
                                oneOf: Number(e.target.value),
                            });
                        }, children: field.oneOf.map((item, i) => (_jsx("option", { value: i, children: schemaToString(item) }, i))) })), toolbar] }) }));
    }
    if (Array.isArray(field.type)) {
        const showSelect = field.type.length > 1;
        return (_jsx(FieldSet, { ...props, name: name, fieldName: fieldName, isRequired: isRequired, field: {
                ...field,
                type: info.selectedType,
            }, depth: depth + 1, slotType: showSelect ? false : slotType, toolbar: _jsxs(_Fragment, { children: [showSelect && (_jsx("select", { className: "text-xs font-mono", value: info.selectedType, onChange: (e) => {
                            updateInfo({
                                selectedType: e.target.value,
                            });
                        }, children: field.type.map((item) => (_jsx("option", { value: item, children: item }, item))) })), toolbar] }) }));
    }
    const showBn = collapsible && (_jsx("button", { type: "button", onClick: () => setShow((prev) => !prev), className: cn(buttonVariants({
            size: 'icon-xs',
            color: 'ghost',
            className: 'text-fd-muted-foreground -ms-1',
        })), children: _jsx(ChevronDown, { className: cn(show && 'rotate-180') }) }));
    if (field.type === 'object' || field.anyOf || field.allOf) {
        return (_jsxs("fieldset", { ...props, className: cn('flex flex-col gap-1.5 col-span-full @container', props.className), children: [_jsxs(FieldLabel, { htmlFor: fieldName, children: [showBn, _jsx(FieldLabelName, { required: isRequired, children: name }), slotType ?? _jsx(FieldLabelType, { children: schemaToString(field) }), toolbar] }), show && (_jsx(ObjectInput, { field: field, fieldName: fieldName, ...props, className: cn('rounded-lg border border-fd-primary/20 bg-fd-background/50 p-2 shadow-sm', props.className) }))] }));
    }
    if (field.type === 'array') {
        return (_jsxs("fieldset", { ...props, className: cn('flex flex-col gap-1.5 col-span-full', props.className), children: [_jsxs(FieldLabel, { htmlFor: fieldName, children: [showBn, _jsx(FieldLabelName, { required: isRequired, children: name }), slotType ?? _jsx(FieldLabelType, { children: schemaToString(field) }), toolbar] }), show && (_jsx(ArrayInput, { fieldName: fieldName, items: field.items ?? anyFields, ...props, className: cn('rounded-lg border border-fd-primary/20 bg-fd-background/50 p-2 shadow-sm', props.className) }))] }));
    }
    return (_jsxs("fieldset", { ...props, className: cn('flex flex-col gap-1.5', props.className), children: [_jsxs(FieldLabel, { htmlFor: fieldName, children: [_jsx(FieldLabelName, { required: isRequired, children: name }), slotType ?? _jsx(FieldLabelType, { children: schemaToString(field) }), toolbar] }), _jsx(FieldInput, { field: field, fieldName: fieldName, isRequired: isRequired })] }));
}
function ArrayInput({ fieldName, items, ...props }) {
    const name = fieldName.split('.').at(-1) ?? '';
    const { fields, append, remove } = useFieldArray({
        name: fieldName,
    });
    return (_jsxs("div", { ...props, className: cn('flex flex-col gap-2', props.className), children: [fields.map((item, index) => (_jsx(FieldSet, { name: _jsxs("span", { className: "text-fd-muted-foreground", children: [name, "[", index, "]"] }), field: items, fieldName: `${fieldName}.${index}`, toolbar: _jsx("button", { type: "button", "aria-label": "Remove Item", className: cn(buttonVariants({
                        color: 'outline',
                        size: 'icon-xs',
                    })), onClick: () => remove(index), children: _jsx(Trash2, {}) }) }, item.id))), _jsxs("button", { type: "button", className: cn(buttonVariants({
                    color: 'secondary',
                    className: 'gap-1.5 py-2',
                    size: 'sm',
                })), onClick: () => {
                    append(getDefaultValue(items));
                }, children: [_jsx(Plus, { className: "size-4" }), "New Item"] })] }));
}
