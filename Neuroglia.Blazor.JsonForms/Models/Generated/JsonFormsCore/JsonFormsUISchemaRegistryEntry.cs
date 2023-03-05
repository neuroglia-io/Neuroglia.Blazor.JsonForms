namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface JsonFormsUISchemaRegistryEntry
    {
        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        UISchemaTester Tester { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement Uischema { get; set; }

    }
}

