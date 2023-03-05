namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface InitActionOptions
    {
        [System.Text.Json.Serialization.JsonPropertyName("additionalErrors")]
        ErrorObject<string, Record<string, object>, object>[]? AdditionalErrors { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("ajv")]
        Ajv? Ajv { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("validationMode")]
        ValidationMode? ValidationMode { get; set; }

    }
}

