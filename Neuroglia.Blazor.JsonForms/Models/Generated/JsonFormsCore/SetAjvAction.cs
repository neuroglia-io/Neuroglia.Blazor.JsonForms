namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface SetAjvAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("ajv")]
        Ajv Ajv { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

