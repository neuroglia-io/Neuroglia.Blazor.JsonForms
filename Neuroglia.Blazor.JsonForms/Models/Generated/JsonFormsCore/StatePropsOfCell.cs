namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State props of a cell.
    /// </summary>
    public interface StatePropsOfCell : StatePropsOfScopedRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("isValid")]
        bool IsValid { get; set; }

    }
}

