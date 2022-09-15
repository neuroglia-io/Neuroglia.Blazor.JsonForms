namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface OwnPropsOfEnum
    {
        [System.Text.Json.Serialization.JsonPropertyName("options")]
        EnumOption[]? Options { get; set; }

    }
}

