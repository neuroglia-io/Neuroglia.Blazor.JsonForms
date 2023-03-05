namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// The categorization element, which may have children elements.
    /// A child element may either be itself a Categorization or a Category, hence
    /// the categorization element can be used to represent recursive structures like trees.
    /// </summary>
    public interface Categorization : UISchemaElement, Labeled
    {
        /// <summary>
        /// The child elements of this categorization which are either of type
        /// {@link Category} or {@link Categorization}.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("elements")]
        Neuroglia.Blazor.JsonForms.Models.GeneratedTypes.CategorizationCategoryUnion[] Elements { get; set; }

    }
}

