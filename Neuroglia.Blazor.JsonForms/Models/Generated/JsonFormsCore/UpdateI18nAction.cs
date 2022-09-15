namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface UpdateI18nAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("errorTranslator")]
        ErrorTranslator ErrorTranslator { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("locale")]
        string Locale { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("translator")]
        Translator Translator { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

