namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface UnregisterDefaultDataAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("schemaPath")]
        string SchemaPath { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

