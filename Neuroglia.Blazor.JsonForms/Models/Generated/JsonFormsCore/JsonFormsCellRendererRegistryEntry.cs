namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface JsonFormsCellRendererRegistryEntry
    {
        [System.Text.Json.Serialization.JsonPropertyName("cell")]
        object Cell { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        RankedTester Tester { get; set; }

    }
}

