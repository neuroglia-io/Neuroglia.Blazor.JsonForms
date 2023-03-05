namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    /// <summary>
    /// Dispatch props of a table control
    /// </summary>
    public interface DispatchPropsOfArrayControl
    {
        System.Action AddItem(string path, object value);

        System.Action MoveDown(string path, double toMove);

        System.Action MoveUp(string path, double toMove);

        System.Action RemoveItems(string path, double[] toDelete);

    }
}

