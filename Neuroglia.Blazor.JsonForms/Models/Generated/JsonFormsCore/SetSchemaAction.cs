namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface SetSchemaAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema Schema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

