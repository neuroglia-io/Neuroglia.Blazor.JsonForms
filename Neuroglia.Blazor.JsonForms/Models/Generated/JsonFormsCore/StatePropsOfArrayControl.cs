namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State-based props of a table control.
    /// </summary>
    public interface StatePropsOfArrayControl : StatePropsOfControlWithDetail
    {
        [System.Text.Json.Serialization.JsonPropertyName("childErrors")]
        ErrorObject<string, Record<string, object>, object>[]? ChildErrors { get; set; }

    }
}

