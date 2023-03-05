namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Dispatch-based props of a Control.
    /// </summary>
    public interface DispatchPropsOfControl
    {
        /// <summary>
        /// Update handler that emits a data change
        /// </summary>
        void HandleChange(string path, object value);

    }
}

