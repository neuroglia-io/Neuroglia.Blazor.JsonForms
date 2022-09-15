namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface SetValidationModeAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("validationMode")]
        ValidationMode ValidationMode { get; set; }

    }
}

