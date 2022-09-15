namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// State-based props of a table control.
    /// </summary>
    interface StatePropsOfControlWithDetail : StatePropsOfControl
    {
        [System.Text.Json.Serialization.JsonPropertyName("uischemas")]
        JsonFormsUISchemaRegistryEntry[]? Uischemas { get; set; }

    }
}

