namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface Internationalizable
    {
        [System.Text.Json.Serialization.JsonPropertyName("i18n")]
        string? I18n { get; set; }

    }
}

