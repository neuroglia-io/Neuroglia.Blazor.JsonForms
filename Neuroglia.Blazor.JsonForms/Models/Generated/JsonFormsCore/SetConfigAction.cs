namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface SetConfigAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("config")]
        object Config { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

