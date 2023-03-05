namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface JsonFormsCellRendererRegistryEntry
    {
        [System.Text.Json.Serialization.JsonPropertyName("cell")]
        object Cell { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        RankedTester Tester { get; set; }

    }
}

