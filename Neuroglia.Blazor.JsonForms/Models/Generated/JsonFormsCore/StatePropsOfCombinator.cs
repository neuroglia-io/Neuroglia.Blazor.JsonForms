namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface StatePropsOfCombinator : StatePropsOfControl
    {
        [System.Text.Json.Serialization.JsonPropertyName("indexOfFittingSchema")]
        double IndexOfFittingSchema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischemas")]
        JsonFormsUISchemaRegistryEntry[] Uischemas { get; set; }

    }
}

