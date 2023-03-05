namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface OwnPropsOfControl : OwnPropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("id")]
        string? Id { get; set; }

    }
}

