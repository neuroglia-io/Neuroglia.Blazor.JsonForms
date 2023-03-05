namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface RegisterDefaultDataAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("data")]
        object Data { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("schemaPath")]
        string SchemaPath { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

