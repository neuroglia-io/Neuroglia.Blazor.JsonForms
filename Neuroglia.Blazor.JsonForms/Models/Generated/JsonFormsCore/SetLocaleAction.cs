namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface SetLocaleAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("locale")]
        string Locale { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

