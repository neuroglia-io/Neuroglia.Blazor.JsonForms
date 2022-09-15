namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State props of a cell.
    /// </summary>
    interface StatePropsOfCell : StatePropsOfScopedRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("isValid")]
        bool IsValid { get; set; }

    }
}

