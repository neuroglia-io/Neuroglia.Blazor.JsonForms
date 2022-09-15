namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface CombinatorSubSchemaRenderInfo
    {
        [System.Text.Json.Serialization.JsonPropertyName("label")]
        string Label { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema Schema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement Uischema { get; set; }

    }
}

