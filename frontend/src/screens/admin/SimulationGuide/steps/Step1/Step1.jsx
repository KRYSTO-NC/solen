import { toast } from "react-toastify";
import { useCreateInstallationMutation } from "../../../../../slices/installationsApiSlice";
import Loader from "../../../../../components/Loader";

const Step1 = ({ onNext }) => {
    const [createInstallation, { data: installationData , isLoading , refetch}] = useCreateInstallationMutation();
  
    const createInstallationHandler = async () => {
        if (window.confirm("Voulez-vous créer une nouvelle simulation ?")) {
          try {
            const result = await createInstallation();
            const installationId = result.data._id;  // Accédez aux données ici
           
            if (installationId) {
                toast.success("Installation créée avec succès");
                onNext(installationId);  // Passez l'objet à la fonction de rappel onNext
              }
          } catch (error) {
            toast.error(error?.data?.message || error?.message);
          }
        }
      };
  
    return (
      <div className="heading">
        {isLoading && <Loader />}
        <h1>Création d'une simulation</h1>
        <p>Assistant de création d'une simulation d'installation.</p>
        <button
          className="btn btn-lg btn-primary"
          onClick={createInstallationHandler}
        >
          Commencer
        </button>
      </div>
    );
  };
  
  export default Step1;
  