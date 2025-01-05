import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { AlertDialog } from '../components/AlertDialog';
import { ScrollButton } from '../components/ScrollButton';
import { FormField } from '../components/FormField';
import { LoadingHearts } from '../components/LoadingHearts';
import { PageLoading } from '../components/PageLoading';
import { addRSVP } from '../services/firebase/rsvp';
import { formatPhone } from '../lib/utils';
import toast from 'react-hot-toast';

const formSchema = z.object({
  fullName: z.string().min(1, 'Nome completo é obrigatório'),
  phone: z.string().min(14, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
});

type FormData = z.infer<typeof formSchema>;

export function RSVP() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await addRSVP({
        ...data,
        confirmed: true,
        timestamp: new Date(),
      });
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error('Erro ao enviar formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    navigate('/gifts');
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3)' }}>
      <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-8" autoComplete="on">
          <h1 className="text-3xl font-bold text-white text-center mb-12">Confirme sua Presença</h1>
          
          <FormField
            {...register('fullName')}
            label="Nome Completo"
            error={errors.fullName?.message}
            autoComplete="name"
          />

          <FormField
            {...register('phone')}
            type="tel"
            label="Telefone"
            error={errors.phone?.message}
            autoComplete="tel"
            inputMode="numeric"
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              e.target.value = formatted;
              setValue('phone', formatted);
            }}
          />

          <FormField
            {...register('email')}
            type="email"
            label="Email"
            error={errors.email?.message}
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-400 text-white py-4 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingHearts className="scale-75" />
                <span>Enviando...</span>
              </>
            ) : (
              'Responder'
            )}
          </button>
        </form>
      </div>

      <ScrollButton />

      <AlertDialog
        isOpen={showSuccessDialog}
        onClose={handleSuccessClose}
        title="Confirmação Recebida"
        message={
          <>
            Obrigado pela confirmação, será uma alegria está conosco nesse momento tão especial.
            <br />
            <br />
            <strong>
              Agora que sua presença foi confirmada, dê uma olhada em nossa especial lista de presentes.
            </strong>
          </>
        }
        confirmLabel="OK"
        variant="info"
      />
    </div>
  );
}