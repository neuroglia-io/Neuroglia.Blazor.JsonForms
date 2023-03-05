namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface SetUISchemaAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("uischema")]
        UISchemaElement Uischema { get; set; }

    }
}

