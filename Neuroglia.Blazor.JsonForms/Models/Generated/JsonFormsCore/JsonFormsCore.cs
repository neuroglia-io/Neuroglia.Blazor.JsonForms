namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface JsonFormsCore
    {
        [System.Text.Json.Serialization.JsonPropertyName("additionalErrors")]
        ErrorObject<string, Record<string, object>, object>[]? AdditionalErrors { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("ajv")]
        Ajv? Ajv { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("data")]
        object Data { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("errors")]
        ErrorObject<string, Record<string, object>, object>[]? Errors { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema Schema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement Uischema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("validationMode")]
        ValidationMode? ValidationMode { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("validator")]
        ValidateFunction<object>? Validator { get; set; }

    }
}

