namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface SetUISchemaAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement Uischema { get; set; }

    }
}

