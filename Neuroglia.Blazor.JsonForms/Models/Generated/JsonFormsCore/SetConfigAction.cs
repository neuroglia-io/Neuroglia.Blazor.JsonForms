namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface SetConfigAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("config")]
        object Config { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

