namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface Action<T>
    {
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        T Type { get; set; }

    }
}

