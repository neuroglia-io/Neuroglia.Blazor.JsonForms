namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface SetValidationModeAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("validationMode")]
        ValidationMode ValidationMode { get; set; }

    }
}

