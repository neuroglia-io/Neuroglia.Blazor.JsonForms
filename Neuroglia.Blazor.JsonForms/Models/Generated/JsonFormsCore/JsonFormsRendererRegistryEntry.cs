namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface JsonFormsRendererRegistryEntry
    {
        [System.Text.Json.Serialization.JsonPropertyName("renderer")]
        object Renderer { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        RankedTester Tester { get; set; }

    }
}

