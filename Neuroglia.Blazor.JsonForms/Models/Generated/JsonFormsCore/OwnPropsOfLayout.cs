namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface OwnPropsOfLayout : OwnPropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("direction")]
        string? Direction { get; set; }

    }
}

