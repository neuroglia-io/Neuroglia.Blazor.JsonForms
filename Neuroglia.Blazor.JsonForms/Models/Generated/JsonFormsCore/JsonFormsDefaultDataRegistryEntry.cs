namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface JsonFormsDefaultDataRegistryEntry
    {
        [System.Text.Json.Serialization.JsonPropertyName("data")]
        object Data { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("schemaPath")]
        string SchemaPath { get; set; }

    }
}

