namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface UpdateCoreAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("data")]
        object? Data { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("options")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.InitActionOptionsAjvUnion? Options { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema? Schema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement? Uischema { get; set; }

    }
}

