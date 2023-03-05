export function init(element, dotnetRef, inputs) {
    if (!element || !dotnetRef || !inputs) {
        //throw 'JSONForms Blazor/JS interop, missing argument(s)';
        return null;
    }
    Object.entries(inputs)
        .filter(([, entry]) => entry != null)
        .forEach(([prop, entry]) => {
            if (prop !== 'uiSchema' && prop !== 'readOnly') {
                element[prop] = entry;
                return;
            }
            // casing missmatch
            element[prop.toLowerCase()] = entry;
        });
    const dataHandler = async (evt) => await dotnetRef.invokeMethodAsync('OnDataChange', evt.detail);
    const errorsHandler = async (evt) => await dotnetRef.invokeMethodAsync('OnErrors', evt.detail);
    element.addEventListener('dataChange', dataHandler);
    element.addEventListener('errors', errorsHandler);
    return {
        disconnect: () => {
            element.removeEventListener('dataChange', dataHandler);
            element.removeEventListener('errors', errorsHandler);
        }
    }
}
