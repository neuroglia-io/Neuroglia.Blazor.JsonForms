namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface WithClassname
    {
        [System.Text.Json.Serialization.JsonPropertyName("className")]
        string? ClassName { get; set; }

    }
}

