namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface EnumOption
    {
        [System.Text.Json.Serialization.JsonPropertyName("label")]
        string Label { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("value")]
        object Value { get; set; }

    }
}

