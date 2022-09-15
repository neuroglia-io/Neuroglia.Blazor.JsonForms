namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface StatePropsOfLabel : StatePropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("text")]
        string? Text { get; set; }

    }
}

