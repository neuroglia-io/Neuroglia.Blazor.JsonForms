namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface OwnPropsOfControl : OwnPropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("id")]
        string? Id { get; set; }

    }
}

