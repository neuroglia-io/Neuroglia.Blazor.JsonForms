namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface OwnPropsOfCell : OwnPropsOfControl
    {
        [System.Text.Json.Serialization.JsonPropertyName("data")]
        object? Data { get; set; }

    }
}

