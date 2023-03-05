namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface StatePropsOfLabel : StatePropsOfRenderer
    {
        [System.Text.Json.Serialization.JsonPropertyName("text")]
        string? Text { get; set; }

    }
}

