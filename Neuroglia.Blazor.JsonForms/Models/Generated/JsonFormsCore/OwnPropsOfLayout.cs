namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface OwnPropsOfLayout : OwnPropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("direction")]
        string? Direction { get; set; }

    }
}

