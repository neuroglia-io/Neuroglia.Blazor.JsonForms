namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface JsonFormsI18nState
    {
        [System.Text.Json.Serialization.JsonPropertyName("locale")]
        string? Locale { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("translate")]
        Translator? Translate { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("translateError")]
        ErrorTranslator? TranslateError { get; set; }

    }
}

