namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface StatePropsOfJsonFormsRenderer : OwnPropsOfJsonFormsRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("config")]
        object Config { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("rootSchema")]
        JsonSchema RootSchema { get; set; }

    }
}

