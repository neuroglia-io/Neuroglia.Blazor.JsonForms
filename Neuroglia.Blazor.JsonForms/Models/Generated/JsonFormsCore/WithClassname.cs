namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface WithClassname
    {
        [System.Text.Json.Serialization.JsonPropertyName("className")]
        string? ClassName { get; set; }

    }
}

